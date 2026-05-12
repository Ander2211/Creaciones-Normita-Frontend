import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function useFetch(pagina = 1, porPagina = 9) {
    const [data, setData] = useState({ items: [], totalPaginas: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            try {
                // Calcular el rango para la paginación
                const desde = (pagina - 1) * porPagina;
                const hasta = desde + porPagina - 1;

                // Consulta a Supabase
                console.log("Iniciando fetch de productos para página:", pagina);
                const { data: items, error: supabaseError, count } = await supabase
                    .from('productos')
                    .select('*', { count: 'exact' })
                    .eq('activo', true)
                    .range(desde, hasta)
                    .order('fecha_creacion', { ascending: false });


                if (supabaseError) {
                    console.error("Error de Supabase:", supabaseError);
                    throw supabaseError;
                }

                console.log("Productos recibidos de Supabase:", items);
                console.log("Total de productos (count):", count);

                // Mapeo de snake_case a camelCase para compatibilidad
                const mappedItems = (items || []).map(item => ({
                    ...item,
                    imagenUrls: item.imagen_urls,
                    fechaCreacion: item.fecha_creacion
                }));

                console.log("Productos mapeados para el frontend:", mappedItems);

                setData({
                    items: mappedItems,
                    totalPaginas: Math.ceil((count || 0) / porPagina)
                });


            } catch (err) {
                console.error("Error fetching productos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [pagina, porPagina]);

    return { data, loading, error };
}