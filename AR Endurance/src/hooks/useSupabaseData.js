
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const useSupabaseData = (tableName, initialData, isSingleItem = false) => {
  const [data, setData] = useState(isSingleItem ? (initialData[0] || null) : initialData);
  const [loading, setLoading] = useState(true);

  const stableInitialData = useMemo(() => initialData, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: fetchedData, error } = await supabase.from(tableName).select('*');
      if (error) throw error;

      if (fetchedData && fetchedData.length > 0) {
        if (isSingleItem) {
          setData(fetchedData[0].data ? { ...fetchedData[0].data, id: fetchedData[0].id } : null);
        } else {
          setData(fetchedData.map(item => item.data ? { ...item.data, id: item.id } : item));
        }
      } else if (stableInitialData && stableInitialData.length > 0 && (!fetchedData || fetchedData.length === 0)) {
        const initialDataToInsert = stableInitialData.map(item => {
          const { id, ...restOfData } = item; 
          return { data: restOfData, ...(id ? {id: id} : {}) };
        });
        
        const { data: insertedData, error: insertError } = await supabase.from(tableName).insert(initialDataToInsert).select();
        if (insertError) throw insertError;

        if (insertedData && insertedData.length > 0) {
          if (isSingleItem) {
            setData(insertedData[0].data ? { ...insertedData[0].data, id: insertedData[0].id } : null);
          } else {
            setData(insertedData.map(item => item.data ? { ...item.data, id: item.id } : item));
          }
        } else {
           setData(isSingleItem ? (stableInitialData[0] || null) : stableInitialData);
        }

      } else {
        setData(isSingleItem ? null : []);
      }
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      toast({
        title: `Error al cargar ${tableName}`,
        description: error.message,
        variant: "destructive",
      });
      setData(isSingleItem ? (stableInitialData[0] || null) : stableInitialData);
    } finally {
      setLoading(false);
    }
  }, [tableName, isSingleItem, stableInitialData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveDataToSupabase = async (updatedData) => {
    try {
      let upsertPayload;
      if (isSingleItem && updatedData) {
        const { id, ...restOfData } = updatedData;
        upsertPayload = [{ id, data: restOfData }];
      } else if (Array.isArray(updatedData)) {
        upsertPayload = updatedData.map(item => {
          const { id, ...restOfData } = item;
          return { id, data: restOfData };
        });
      } else {
        console.error("Invalid data format for saveDataToSupabase");
        return;
      }
      
      const { error } = await supabase.from(tableName).upsert(upsertPayload, { onConflict: 'id' });
      if (error) throw error;
      
      setData(updatedData);
      toast({
        title: "Datos guardados",
        description: `Los cambios en ${tableName} se han guardado correctamente.`,
      });
    } catch (error) {
      console.error(`Error saving ${tableName} to Supabase:`, error);
      toast({
        title: `Error al guardar ${tableName}`,
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  return { data, setData, loading, saveDataToSupabase, fetchData };
};

export default useSupabaseData;
