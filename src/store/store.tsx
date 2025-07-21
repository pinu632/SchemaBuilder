import { createContext, useContext, useState, type ReactNode } from "react";


export type SchemaProviderProps = {
  children: ReactNode;
};

export type Field = {
  id: string;
  key: string;
  dataType: string;
  isRequired: boolean;
  parentId?: string;
};

export type FieldsContext = {
  nestedObject: any;
  addFields: (newFields: Field[]) => void;
};

const fieldsContext = createContext<FieldsContext | null>(null);

// BuildObject logic
const BuildObject = (fields: Field[], parentId?: string): any => {
  const obj: Record<string, any> = {};

  const children = fields.filter(item => item.parentId === parentId);

  for (const field of children) {
    if (!field.key) continue; // skip empty keys

    if (field.dataType === "object") {
      obj[field.key] = BuildObject(fields, field.id);
    } else {
      let value: any;

      switch (field.dataType) {
        case "string":
          value = "String";
          break;
        case "number":
          value = "number";
          break;
        case "boolean":
          value = "boolean";
          break;
        case "int[]":
          value = ["number"];
          break;
        case "string[]":
          value = ["string"];
          break;
        case "JSON[]":
          value = [BuildObject(fields,field.id)];
          break;
        default:
          value = "null";
      }

      obj[field.key] = value;
    }
  }

  return obj;
};

// Provider
export const SchemaProvider = ({ children }: SchemaProviderProps) => {
  const [fields, setFields] = useState<Field[]>([]);

  const addFields = (newFields: Field[]) => {
    setFields(newFields);
  };

  const nestedObject = BuildObject(fields);

  return (
    <fieldsContext.Provider value={{ nestedObject, addFields }}>
      {children}
    </fieldsContext.Provider>
  );
};

// Hook
export const useSchema = () => {
  const context = useContext(fieldsContext);
  if (!context) {
    throw new Error("useSchema must be used within a SchemaProvider");
  }
  return context;
};
