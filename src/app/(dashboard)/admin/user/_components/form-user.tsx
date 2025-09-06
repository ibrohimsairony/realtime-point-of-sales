import FormImage from "@/components/common/form-image";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ROLE_LIST } from "@/constants/auth.constant";
import { Preview } from "@/types/general";
import { Loader2, Trash2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type?: "Create" | "Update";
  preview?: Preview;
  setPreview: (preview: Preview) => void;
}) {
  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>{type} User</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Register a new user" : "Make changes user here"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="insert your Name"
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"email" as Path<T>}
              label="Email"
              placeholder="insert your Email"
              type="email"
            />
          )}

          <FormSelect
            form={form}
            name={"role" as Path<T>}
            label="Role"
            selectItem={ROLE_LIST}
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"password" as Path<T>}
              label="Password"
              placeholder="*********"
              type="password"
            />
          )}
          <FormImage
            form={form}
            name={"avatar_url" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />
          <DialogFooter className="flex flex-row justify-between sm:justify-between">
            <div className="flex justify-end">
              <Button variant="destructive">
                <Trash2 />
                Delete
              </Button>
            </div>
            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isLoading ? <Loader2 className="animate-spin" /> : type}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
