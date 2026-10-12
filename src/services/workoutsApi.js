import { supabase } from "./supabaseClient";
import { toRussian } from "./errors";

function fail(error) {
    throw new Error(toRussian(error.message));
}

export async function getAllWorkouts() {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .order("date", { ascending: false })
        .order("id", { ascending: false });
    if (error) fail(error);
    return data;
}

export async function getMyWorkouts(userId) {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .order("id", { ascending: false });
    if (error) fail(error);
    return data;
}

export async function getWorkout(id) {
    if (!/^\d+$/.test(String(id))) return null;
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
    if (error) fail(error);
    return data;
}

export async function createWorkout(values) {
    const { data, error } = await supabase
        .from("workouts")
        .insert(values)
        .select()
        .single();
    if (error) fail(error);
    return data;
}

export async function updateWorkout(id, values) {
    const { data, error } = await supabase
        .from("workouts")
        .update(values)
        .eq("id", id)
        .select();
    if (error) fail(error);
    if (data.length === 0)
        throw new Error("Запись не найдена или у вас нет прав на её изменение");
    return data[0];
}

export async function deleteWorkout(id) {
    const { data, error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id)
        .select();
    if (error) fail(error);
    if (data.length === 0)
        throw new Error("Запись не найдена или у вас нет прав на её удаление");
}
