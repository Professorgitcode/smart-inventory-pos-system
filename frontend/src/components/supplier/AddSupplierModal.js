// ====================================
// ADD SUPPLIER MODAL
// ====================================

import React, {
    useState
} from "react";

import {
    Building2,
    User,
    Mail,
    Phone
} from "lucide-react";

import {
    Modal,
    Button
} from "../ui";

import {
    useTheme
} from "../../context/ThemeContext";

// ====================================
// INITIAL FORM
// ====================================

const INITIAL_FORM = {
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: ""
};

// ====================================
// COMPONENT
// ====================================

const AddSupplierModal = ({
    isOpen,
    onClose,
    onSave,
    isLoading = false
}) => {

    const {
        isDark,
        theme
    } = useTheme();

    const [
        form,
        setForm
    ] = useState(
        INITIAL_FORM
    );

    // ====================================
    // CHANGE
    // ====================================

    const updateField = (
        field,
        value
    ) => {

        setForm(
            previous => ({
                ...previous,
                [field]:
                    value
            })
        );

    };

    // ====================================
    // SUBMIT
    // ====================================

    const handleSubmit =
        async event => {

            event.preventDefault();

            await onSave(form);

            setForm(
                INITIAL_FORM
            );

        };

    // ====================================
    // INPUT STYLE
    // ====================================

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        border:
            `1px solid ${
                theme.colors.border
            }`,
        borderRadius:
            theme.radius.md,
        backgroundColor:
            isDark
                ? "rgba(255,255,255,0.04)"
                : theme.colors.background,
        color:
            theme.colors.text,
        outline: "none",
        boxSizing:
            "border-box"
    };

    // ====================================
    // FIELD
    // ====================================

    const Field = ({
        icon: Icon,
        label,
        value,
        onChange,
        type = "text",
        placeholder
    }) => (

        <label
            style={{
                display: "flex",
                flexDirection:
                    "column",
                gap: "7px"
            }}
        >

            <span
                style={{
                    fontSize: "12px",
                    fontWeight:
                        theme.typography.fontWeight.semibold,
                    color:
                        theme.colors.text
                }}
            >
                {label}
            </span>

            <div
                style={{
                    position: "relative"
                }}
            >

                <Icon
                    size={17}
                    style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform:
                            "translateY(-50%)",
                        color:
                            theme.colors.primary
                    }}
                />

                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={
                        event =>
                            onChange(
                                event.target.value
                            )
                    }
                    disabled={
                        isLoading
                    }
                    style={{
                        ...inputStyle,
                        paddingLeft:
                            "40px"
                    }}
                    required
                />

            </div>

        </label>

    );

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Supplier"
            size="md"
            isDark={isDark}
            closeOnOverlayClick={
                !isLoading
            }
        >

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <p
                    style={{
                        marginTop: 0,
                        marginBottom:
                            "24px",
                        color:
                            theme.colors.textMuted,
                        fontSize:
                            theme.typography.fontSize.sm
                    }}
                >
                    Register a new supplier
                    in the system.
                </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection:
                            "column",
                        gap: "16px"
                    }}
                >

                    <Field
                        icon={Building2}
                        label="Supplier Name"
                        value={
                            form.supplierName
                        }
                        onChange={
                            value =>
                                updateField(
                                    "supplierName",
                                    value
                                )
                        }
                        placeholder={
                            "Enter supplier name"
                        }
                    />

                    <Field
                        icon={User}
                        label="Contact Person"
                        value={
                            form.contactPerson
                        }
                        onChange={
                            value =>
                                updateField(
                                    "contactPerson",
                                    value
                                )
                        }
                        placeholder={
                            "Enter contact person"
                        }
                    />

                    <Field
                        icon={Mail}
                        label="Email Address"
                        type="email"
                        value={
                            form.email
                        }
                        onChange={
                            value =>
                                updateField(
                                    "email",
                                    value
                                )
                        }
                        placeholder={
                            "Enter email address"
                        }
                    />

                    <Field
                        icon={Phone}
                        label="Phone Number"
                        value={
                            form.phone
                        }
                        onChange={
                            value =>
                                updateField(
                                    "phone",
                                    value
                                )
                        }
                        placeholder={
                            "Enter phone number"
                        }
                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        gap: "12px",
                        marginTop:
                            "24px"
                    }}
                >

                    <Button
                        type="button"
                        variant="outline"
                        isDark={isDark}
                        disabled={
                            isLoading
                        }
                        onClick={
                            onClose
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        isDark={isDark}
                        isLoading={
                            isLoading
                        }
                    >
                        Save Supplier
                    </Button>

                </div>

            </form>

        </Modal>

    );
};

export default AddSupplierModal;