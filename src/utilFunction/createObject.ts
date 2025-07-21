type Field = {
  id: string;
  key: string;
  dataType: string;
  isRequired: boolean;
  parentId?: string;
};

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
        case "array":
          value = [];
          break;
        default:
          value = "null";
      }

      obj[field.key] = value;
    }
  }

  return obj;
};

export default BuildObject;
