import React from "react";
import Modal from "@/components/ui/Modal";
import { format } from "date-fns";
import { Form } from "@/components/common/forms/Form";
import { FormInput } from "@/components/common/forms/FormInput";
import { FormDatePicker } from "@/components/common/forms/FormDatePicker";
import { z } from "zod";
import type { CalendarEvent } from "../types";
import { Trash2 } from "lucide-react";

const holidaySchema = z.object({
  name: z.string().min(1, "Holiday title is required"),
  date: z.string().min(1, "Date is required"),
});

type HolidayFormValues = z.infer<typeof holidaySchema>;

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  selectedEvent?: CalendarEvent | null;
  onSubmit: (data: { name: string; date: string }, id?: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  canUpdate: boolean;
  canDelete: boolean;
}

export const AddHolidayModal: React.FC<AddHolidayModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  onSubmit,
  onDelete,
  canUpdate,
  canDelete,
}) => {
  const formId = "add-holiday-form";
  const isEditing = !!selectedEvent;

  const handleFormSubmit = async (values: HolidayFormValues) => {
    await onSubmit({
      name: values.name,
      date: format(new Date(values.date), "yyyy-MM-dd"),
    }, selectedEvent?.id?.replace("h-", ""));
    onClose();
  };

  const handleDelete = async () => {
    if (selectedEvent && onDelete) {
      await onDelete(selectedEvent.id.replace("h-", ""));
      onClose();
    }
  };

  const showPrimaryBtn = isEditing ? canUpdate : true;
  const showDeleteBtn = isEditing && canDelete;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? (canUpdate ? "Edit Holiday" : "View Holiday") : "Add Organization Holiday"}
      description={selectedDate ? `Holiday for ${format(selectedDate, "PPP")}` : "Manage organizational holidays."}
      size="md"
      primaryBtnText={showPrimaryBtn ? (isEditing ? "Update Holiday" : "Create Holiday") : undefined}
      primaryBtnType="submit"
      primaryBtnForm={formId}
      secondaryBtnText={showDeleteBtn ? "Delete" : "Cancel"}
      secondaryBtnClassName={showDeleteBtn ? "w-1/2" : ""}
      onSecondaryAction={showDeleteBtn ? handleDelete : undefined}
    >
      <Form
        id={formId}
        schema={holidaySchema}
        onSubmit={handleFormSubmit}
        defaultValues={{
          name: selectedEvent?.title || "",
          date: selectedEvent?.date || (selectedDate ? selectedDate.toISOString() : ""),
        }}
        className="space-y-6"
      >
        <FormInput
          name="name"
          label="Holiday Title"
          placeholder="e.g. Independence Day"
          required
        />

        {!selectedDate && (
          <FormDatePicker
            name="date"
            label="Holiday Date"
            placeholder="Select date"
            required
          />
        )}
      </Form>
    </Modal>
  );
};
