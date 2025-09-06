import { INITIAL_STATE_UPDATE_USER } from "@/constants/auth.constant";
import {
  UpdateUserForm,
  updateUserSchemaForm,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../actions";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import FormUser from "./form-user";
import { Profile } from "@/types/auth";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

export default function DialogActionUser({
  refetch,
  currentData,
}: {
  refetch: () => void;
  currentData?: Profile | null;
}) {
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchemaForm),
  });

  const [updateUserState, updateUserAction, isPendingUpdateUser] =
    useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    if (currentData?.avatar_url !== data.avatar_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "avatar_url" ? preview!.file ?? "" : value
        );
      });
      formData.append("old_avatar_url", currentData?.avatar_url ?? "");
    } else {
      Object.entries(data).forEach(([Key, value]) => {
        formData.append(Key, value);
      });
    }
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateUserAction(formData);
    });
  });

  useEffect(() => {
    if (updateUserState?.status === "error") {
      toast.error("Update User Failed", {
        description: updateUserState.errors?._form?.[0],
      });
    }

    if (updateUserState?.status === "success") {
      toast.success("Update User Success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [updateUserState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name as string);
      form.setValue("role", currentData.role as string);
      form.setValue("avatar_url", currentData.avatar_url as string);
      setPreview({
        file: new File([], currentData.avatar_url as string),
        displayUrl: currentData.avatar_url as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground size-8"
          size="icon"
        >
          <EllipsisVertical />
        </Button>
      </DialogTrigger>
      <FormUser
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateUser}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
}
