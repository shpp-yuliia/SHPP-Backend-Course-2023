type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

type AnyButtonType = DialogButtonType | FormButton;

type ConfirmationHandlingFormButton = FormButton & {
    onConfirm?: (dialog_button_type: DialogButtonType) => void
};