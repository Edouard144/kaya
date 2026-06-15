import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, X, GripVertical, ImageIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { formatUSD } from "@/lib/shopify";
import {
  listProducts,
  listCategories,
  syncCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/fns/products";
import {
  uploadImage,
  getProductImages,
  addProductImage,
  removeProductImage,
} from "@/lib/fns/images";

type ImageItem = {
  id?: string;
  url: string;
  alt: string;
  sortOrder: number;
  file?: File;
  uploading?: boolean;
};

export const Route = createFileRoute("/admin/dashboard")({
  validateSearch: (s: Record<string, unknown>) => ({
    tab: s.tab === "add" ? "add" as const : "products" as const,
    search: typeof s.search === "string" ? s.search : "",
    edit: typeof s.edit === "string" ? s.edit : "",
  }),
  head: () => ({ meta: [{ title: "Admin Dashboard — Kaya" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { tab: urlTab, search: urlSearch, edit: urlEdit } = Route.useSearch();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate({ to: "/admin" });
    }
  }, [loading, user, navigate]);

  const setTab = (t: "products" | "add") => {
    navigate({ search: (prev) => ({ ...prev, tab: t === "products" ? undefined : t, edit: undefined }) });
  };
  const setSearch = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, search: val || undefined }) });
  };
  const startEdit = (p: any) => {
    navigate({ search: (prev) => ({ ...prev, tab: "add", edit: p.id }) });
  };

  const tab = urlTab;
  const search = urlSearch;
  const editingId = urlEdit || null;

  // Product form state
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formCategoryId, setFormCategoryId] = useState("");
  const [formImages, setFormImages] = useState<ImageItem[]>([]);
  const [formBusy, setFormBusy] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products", search],
    queryFn: () => listProducts({ data: { search: search || undefined } }),
    enabled: !!user && user.role === "admin",
  });

  const { data: dbCategories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => listCategories(),
    enabled: !!user && user.role === "admin",
  });

  // Populate form from URL edit param on refresh
  useEffect(() => {
    if (editingId && products && !formName) {
      const p = products.find((prod) => prod.id === editingId);
      if (p) {
        setFormName(p.name);
        setFormDesc(p.description || "");
        setFormPrice(p.price);
        setFormStock(p.stock?.toString() || "");
        setFormCategoryId(p.categoryId || "");
      }
    }
  }, [editingId, products, formName]);

  // Load existing images when editing
  const { data: existingImages } = useQuery({
    queryKey: ["admin-product-images", editingId],
    queryFn: () => getProductImages({ data: { productId: editingId! } }),
    enabled: !!editingId,
  });

  useEffect(() => {
    if (existingImages && editingId) {
      setFormImages(
        existingImages.map((img, i) => ({
          id: img.id,
          url: img.url,
          alt: img.alt || "",
          sortOrder: img.sortOrder ?? i,
        }))
      );
    }
  }, [existingImages, editingId]);

  const createMut = useMutation({
    mutationFn: () =>
      createProduct({
        data: {
          name: formName,
          description: formDesc || undefined,
          price: formPrice,
          stock: formStock ? parseInt(formStock) : undefined,
          image: formImages[0]?.url || undefined,
          categoryId: formCategoryId || undefined,
        },
      }),
    onSuccess: async (product) => {
      // Save new images to product_images
      for (let i = 0; i < formImages.length; i++) {
        const img = formImages[i];
        if (img.url && !img.id) {
          await addProductImage({
            data: {
              productId: product.id,
              url: img.url,
              alt: img.alt,
              sortOrder: i,
            },
          });
        }
      }
      toast.success("Product created");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      resetForm();
      setTab("products");
    },
    onError: (e: Error) => setFormErr(e.message),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      updateProduct({
        data: {
          id: editingId!,
          name: formName || undefined,
          description: formDesc || undefined,
          price: formPrice || undefined,
          stock: formStock ? parseInt(formStock) : undefined,
          image: formImages[0]?.url || undefined,
          categoryId: formCategoryId || undefined,
        },
      }),
    onSuccess: async () => {
      // Sync images: add new ones, keep existing ones
      const currentIds = new Set(formImages.filter((img) => img.id).map((img) => img.id));

      // Remove images that were deleted
      for (const img of existingImages ?? []) {
        if (!currentIds.has(img.id)) {
          await removeProductImage({ data: { id: img.id } });
        }
      }

      // Add new images
      for (let i = 0; i < formImages.length; i++) {
        const img = formImages[i];
        if (!img.id && img.url) {
          await addProductImage({
            data: {
              productId: editingId!,
              url: img.url,
              alt: img.alt,
              sortOrder: i,
            },
          });
        }
      }

      toast.success("Product updated");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      resetForm();
      setTab("products");
    },
    onError: (e: Error) => setFormErr(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { id } }),
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (e: Error) => toast.error("Delete failed: " + e.message),
  });

  const syncCategoriesMut = useMutation({
    mutationFn: () => syncCategories(),
    onSuccess: (result) => {
      toast.success(`Synced: ${result.created} created, ${result.updated} updated, ${result.merged} merged, ${result.deleted} deleted`);
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      qc.invalidateQueries({ queryKey: ["public-categories"] });
    },
    onError: (e: Error) => toast.error("Sync failed: " + e.message),
  });

  const resetForm = () => {
    setFormName("");
    setFormDesc("");
    setFormPrice("");
    setFormStock("");
    setFormCategoryId("");
    setFormImages([]);
    setFormErr(null);
  };

  const startEditFn = (p: any) => {
    setFormName(p.name);
    setFormDesc(p.description || "");
    setFormPrice(p.price);
    setFormStock(p.stock?.toString() || "");
    setFormCategoryId(p.categoryId || "");
    setFormImages([]);
    startEdit(p);
  };

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages: ImageItem[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      newImages.push({
        url: previewUrl,
        alt: file.name.replace(/\.[^.]+$/, ""),
        sortOrder: formImages.length + newImages.length,
        file,
        uploading: true,
      });
    }

    // Add placeholder images immediately
    setFormImages((prev) => [...prev, ...newImages]);

    // Upload each file to Cloudinary
    for (let i = 0; i < newImages.length; i++) {
      const img = newImages[i];
      if (!img.file) continue;

      try {
        // Convert file to base64 data URL
        const dataUrl = await fileToDataUrl(img.file);
        const result = await uploadImage({ data: { dataUrl, folder: "kaya/products" } });

        // Update the image with the real URL
        setFormImages((prev) => {
          const updated = [...prev];
          const idx = prev.findIndex((p) => p.file === img.file);
          if (idx !== -1) {
            updated[idx] = {
              ...updated[idx],
              url: result.url,
              uploading: false,
              file: undefined,
            };
          }
          return updated;
        });

        toast.success(`Uploaded ${img.alt}`);
      } catch (err) {
        // Remove failed upload
        setFormImages((prev) => prev.filter((p) => p.file !== img.file));
        toast.error(`Failed to upload ${img.alt}`);
      }
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [formImages.length]);

  const removeImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= formImages.length) return;
    setFormImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated.map((img, i) => ({ ...img, sortOrder: i }));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr(null);

    // Check if any uploads are still in progress
    if (formImages.some((img) => img.uploading)) {
      setFormErr("Please wait for all images to finish uploading");
      return;
    }

    if (!formImages.length) {
      setFormErr("Please add at least one product image");
      return;
    }

    setFormBusy(true);
    const mut = editingId ? updateMut : createMut;
    mut.mutate(undefined, {
      onSettled: () => setFormBusy(false),
    });
  };

  if (loading || !user) return null;

  return (
    <div className="container-page py-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Dashboard</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Product Management</h1>
          <p className="mt-1 text-muted-foreground">Welcome, {user.name.split(" ")[0]}</p>
        </div>
        <button onClick={logout} className="btn-ghost text-sm">Sign out</button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setTab("products"); resetForm(); }}
          className={"rounded-full px-4 py-2 text-sm font-medium transition-colors " + (tab === "products" ? "bg-foreground text-background" : "border border-line hover:bg-surface")}
        >
          Products ({products?.length ?? 0})
        </button>
        <button
          onClick={() => { setTab("add"); resetForm(); }}
          className={"rounded-full px-4 py-2 text-sm font-medium transition-colors " + (tab === "add" ? "bg-foreground text-background" : "border border-line hover:bg-surface")}
        >
          {editingId ? "Edit Product" : "+ New Product"}
        </button>
        <button
          onClick={() => syncCategoriesMut.mutate()}
          disabled={syncCategoriesMut.isPending}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-50"
        >
          {syncCategoriesMut.isPending ? "Syncing…" : "Sync Categories"}
        </button>
      </div>

      {/* Product List */}
      {tab === "products" && (
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {isLoading ? (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="surface-card h-20 animate-pulse bg-peach-soft/30" />
              ))}
            </div>
          ) : !products?.length ? (
            <div className="surface-card mt-6 p-12 text-center">
              <div className="font-display text-2xl">No products yet</div>
              <p className="mt-2 text-sm text-muted-foreground">Add your first product to get started.</p>
              <button onClick={() => setTab("add")} className="btn-primary mt-4">
                + Add product
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-2">
              {products.map((p) => (
                <div key={p.id} className="surface-card flex items-center gap-4 p-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-peach-soft/40">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-terracotta/30">◆</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base truncate">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{formatUSD(parseFloat(p.price))}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Stock: {p.stock ?? "∞"}
                  </div>
                  <button
                    onClick={() => startEditFn(p)}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium hover:bg-surface"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this product?")) deleteMut.mutate(p.id);
                    }}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Form */}
      {tab === "add" && (
        <div className="mt-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="surface-card space-y-6 p-6">
            <h2 className="font-display text-2xl">{editingId ? "Edit Product" : "New Product"}</h2>

            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Name *</label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                  placeholder="300TC Sheet Set"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Price (USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                  placeholder="29.99"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                placeholder="Product description…"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Stock</label>
                <input
                  type="number"
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</label>
                <select
                  value={formCategoryId}
                  onChange={(e) => setFormCategoryId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-terracotta"
                >
                  <option value="">No category</option>
                  {dbCategories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multi-Image Upload */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Product Images * <span className="normal-case">(first image is the main one)</span>
              </label>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = e.dataTransfer.files;
                  if (files.length && fileInputRef.current) {
                    // Create a synthetic event-like object
                    const dt = new DataTransfer();
                    for (const f of Array.from(files)) dt.items.add(f);
                    fileInputRef.current.files = dt.files;
                    fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
                  }
                }}
                className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-background/50 p-8 transition-colors hover:border-terracotta/50 hover:bg-peach-soft/10"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-muted-foreground/70">
                  PNG, JPG, WEBP — max 10MB each
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Image previews */}
              {formImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {formImages.map((img, i) => (
                    <div
                      key={`${img.id ?? "new"}-${i}`}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-background"
                    >
                      {img.uploading ? (
                        <div className="grid h-full w-full place-items-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
                        </div>
                      ) : (
                        <>
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="h-full w-full object-cover"
                          />
                          {i === 0 && (
                            <div className="absolute top-1.5 left-1.5 rounded bg-terracotta px-1.5 py-0.5 text-[10px] font-medium text-white">
                              Main
                            </div>
                          )}
                        </>
                      )}

                      {/* Controls */}
                      {!img.uploading && (
                        <div className="absolute inset-0 flex items-center justify-center gap-1 bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/40 group-hover:opacity-100">
                          {i > 0 && (
                            <button
                              type="button"
                              onClick={() => moveImage(i, i - 1)}
                              className="rounded-full bg-background/80 p-1.5 hover:bg-background"
                            >
                              <GripVertical className="h-3 w-3 -rotate-90" />
                            </button>
                          )}
                          {i < formImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveImage(i, i + 1)}
                              className="rounded-full bg-background/80 p-1.5 hover:bg-background"
                            >
                              <GripVertical className="h-3 w-3 rotate-90" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="rounded-full bg-destructive/80 p-1.5 hover:bg-destructive"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {formErr && <div className="text-sm text-destructive">{formErr}</div>}

            <div className="flex gap-3">
              <button disabled={formBusy} className="btn-primary disabled:opacity-60">
                {formBusy ? "Saving…" : editingId ? "Update product" : "Create product"}
              </button>
              <button type="button" onClick={() => { resetForm(); setTab("products"); }} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
