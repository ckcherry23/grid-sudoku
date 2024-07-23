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
  triggerText?: string;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onAction?: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
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
