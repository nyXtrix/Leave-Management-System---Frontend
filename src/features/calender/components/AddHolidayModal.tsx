import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
}

export const AddHolidayModal: React.FC<AddHolidayModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend call
    console.log("Adding holiday:", { title, date: selectedDate });
    onClose();
    setTitle("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Organization Holiday"
      description={selectedDate ? `Creating holiday for ${format(selectedDate, "PPP")}` : "Create a new holiday for the entire organization."}
      size="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
            Holiday Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Independence Day"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-semibold outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" type="button" onClick={onClose} className="rounded-xl font-bold">
            Cancel
          </Button>
          <Button type="submit" className="rounded-xl font-bold bg-primary-600 hover:bg-primary-700 shadow-glow-primary">
            Create Holiday
          </Button>
        </div>
      </form>
    </Modal>
  );
};
