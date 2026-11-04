import { useState } from "react";
import Swal from "sweetalert2";
import { useProductCrud } from "../hooks/useProductCrud";
import { ProductForm } from "./ProductForm";

export function AdminDashboard() {
  const { products, isLoading, error, isMutating, createProduct, updateProduct, deleteProduct } = useProductCrud();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleCreateClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
    setIsFormOpen(false);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  const toggleSelectOne = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleBulkDelete = async () => {
    const selectedProducts = products.filter((p) => selectedIds.has(p.id));
    const count = selectedProducts.length;

    const result = await Swal.fire({
      title: "¿Eliminar productos?",
      text: `Se eliminarán ${count} producto${count > 1 ? "s" : ""} permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar todo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    await Promise.all(Array.from(selectedIds).map((id) => deleteProduct(id, true)));

    setSelectedIds(new Set());

    Swal.fire({
      icon: "success",
      title: "Eliminados",
      text: `Los productos seleccionados han sido eliminados.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-4">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin"></div>
        <p className="font-medium">Cargando inventario...</p>
      </div>
    );
  }
  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">{error}</div>;
  }

  const isAllSelected = products.length > 0 && selectedIds.size === products.length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">Administra tu inventario de manera eficiente.</p>
        </div>
        <button
          onClick={handleCreateClick}
          className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Nuevo Producto
        </button>
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-4 duration-300">
          <span className="text-sm font-medium border-r border-slate-600 pr-6">
            {selectedIds.size} seleccionados
          </span>
          <button
            onClick={handleBulkDelete}
            className="text-sm font-semibold bg-red-500/20 text-red-300 hover:bg-red-500/30 px-4 py-1.5 rounded-lg transition"
          >
            Eliminar seleccionados
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-sm font-medium text-slate-400 hover:text-white transition ml-2"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                </th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Producto</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoría</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Precio</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50/80 transition-colors group ${selectedIds.has(product.id) ? "bg-teal-50/50" : ""}`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggleSelectOne(product.id)}
                      className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <img src={product.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate max-w-[200px]">{product.title}</p>
                        <p className="text-xs text-slate-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-800">${product.price.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.2v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-lg font-bold text-slate-800">
                {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
              </h2>
              <button onClick={handleCancel} className="text-slate-400 hover:text-slate-700 text-xl transition-colors">
                ✕
              </button>
            </div>
            <div className="p-8">
              <ProductForm
                initialData={editingProduct}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isMutating={isMutating}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}