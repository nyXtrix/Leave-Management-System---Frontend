import { departmentValidation, type DepartmentValidationData } from '@/validations/organization/DepartmentValidation';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Form, FormInput, FormTextarea } from '@/components/common/forms';

interface DepartmentCreateOrEditModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { mode: "CREATE" | "EDIT"; name: string; description: string }) => void;
  initialData?: { name: string; description: string } | null;
  isLoading?: boolean;
  mode: "CREATE" | "EDIT";
}

const DepartmentCreateOrEditModel: React.FC<DepartmentCreateOrEditModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}) => {
  const handleSubmit = (data: DepartmentValidationData) => {
    onSubmit({
      mode,
      name: data.name,
      description: data.description || '',
    });
  };

  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "CREATE" ? 'Create Department' : 'Edit Department'}
      size="md"
    >
      <Form
        schema={departmentValidation}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormInput
            name="name"
            label="Department Name"
            placeholder="e.g. Engineering"
            required
            autoFocus
          />

          <FormTextarea
            name="description"
            label="Description"
            placeholder="Briefly describe the department's role..."
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {mode === "EDIT" ? 'Save Changes' : 'Create Department'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DepartmentCreateOrEditModel;