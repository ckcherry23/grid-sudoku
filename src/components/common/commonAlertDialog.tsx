import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CommonAlertDialogProps = {
  actionText?: string;
  cancelText?: string;
  description?: string;
  isOpen?: boolean;
  onAction?: () => void;
  setIsOpen?: (isOpen: boolean) => void;
  title?: string;
  triggerText?: string;
};

export default function CommonAlertDialog({
  triggerText,
  title,
  description,
  cancelText,
  actionText,
  onAction,
  isOpen,
  setIsOpen,
}: CommonAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerText && <AlertDialogTrigger>{triggerText}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
          {actionText && (
            <AlertDialogAction onClick={onAction}>
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
