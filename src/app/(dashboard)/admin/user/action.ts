"use server";
import { createClient } from "@/lib/supabase/server";
import { AuthFormState } from "@/types/auth";
import { createUserSchemaForm } from "@/validations/auth-validation";

export async function createUser(prevState: AuthFormState, formData: FormData) {
  const validatedFields = createUserSchemaForm.safeParse({
    name: formData?.get("name"),
    email: formData?.get("email"),
    role: formData?.get("role"),
    password: formData?.get("password"),
    avatar_url: formData?.get("avatar_url"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        name: validatedFields.data.name,
        role: validatedFields.data.role,
        avatar_url: validatedFields.data.avatar_url,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}
