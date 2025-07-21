import { useEffect, useState } from 'react';
import FormElement from './FormmELement';
import { Button } from '../ui/button';
import { v4 as uuidv4 } from 'uuid';
import BuildObject from '@/utilFunction/createObject';
import { useSchema } from '@/store/store';
import { Plus } from 'lucide-react';

interface Field {
  id: string;
  key: string;
  dataType: string;
  isRequired: boolean;
  parentId?: string;
  defaultValue?: string;
}

function MainCard() {

  const {addFields} = useSchema()
  const [fields, setFields] = useState<Field[]>([

 
]);

useEffect(()=>{
  console.log("Fields updated:", fields);
  const result = JSON.stringify(BuildObject(fields), null, 2);
  console.log(result)
  addFields(fields)
},[fields])

  const handleAddField = (parentId?: string) => {
    const newField: Field = {
      id: uuidv4(),
      key: '',
      dataType: 'string',
      isRequired: false,
      parentId: parentId || undefined,
    };
    setFields(prev => [...prev, newField]);
  };



 function getAllDescendantsBFS(data: Field[], deleteId: string): string[] {
  const idsToDelete: string[] = [];
  const queue: string[] = [deleteId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    idsToDelete.push(currentId);

    // Find all direct children of currentId
    const children = data.filter(item => item.parentId === currentId);
    for (const child of children) {
      queue.push(child.id); // enqueue child id
    }
  }

  return idsToDelete;
}

function deleteWithChildren(data: Field[], deleteId: string): void {
  const toDelete = new Set(getAllDescendantsBFS(data, deleteId));
  
  const newField=  data.filter(node => !toDelete.has(node.id));
  setFields(newField)
}



  const handleFieldNameChange = (id: string, value: string) => {
    setFields(prev =>
      prev.map(field => (field.id === id ? { ...field, key: value } : field))
    );
  };
  const handleDataTypeChange = (id: string, value: string) => {
    setFields(prev =>
      prev.map(field => (field.id === id ? { ...field, dataType: value } : field))
    );
  };
  const handleRequiredToggle = (id: string, value: boolean) => {
    setFields(prev =>
      prev.map(field => (field.id === id ? { ...field, isRequired: value } : field))
    );
  };


 const renderFields = (parentId?: string, depth = 0) => {
    const children = fields.filter(f => f.parentId === parentId);

    if (children.length === 0) return null;

    return (
      <div className="w-full border-l border-gray-400 pl-4">
        {children.map((field) => (
          <div
            key={field.id}
            className="mb-2"
            style={{ paddingLeft: `${depth * 20}px` }}
          >
            <FormElement
              className='mb-1'
              fieldId={field.id}
              isRequired={field.isRequired}
              value={field.key}
              onDataTypeChange={(val)=>{
                if (val === "object") {
                  handleAddField(field.id);
                  handleDataTypeChange(field.id, val);
                }else if(val === "JSON[]"){
                  handleAddField(field.id)
                  handleDataTypeChange(field.id, val);
                }else{
                  handleDataTypeChange(field.id, val);
                }
              }}
              onFieldNameChange={(val) => handleFieldNameChange(field.id, val)}
              onRequiredToggle={  (val) => handleRequiredToggle(field.id, val)}
              onDelete={(id)=>deleteWithChildren(fields,id)}
            />
            {renderFields(field.id, depth + 1)}
          </div>
        ))}

        {/* Add Field Button shown once after all sibling fields */}
        <Button
          variant="outline"
          className="w-full cursor-pointer min-w-[350px]  sm:min-w-[400px]  bg-blue-500 text-white border-none hover:bg-blue-600 hover:text-white"
          onClick={() => handleAddField(parentId)}
        >
        <Plus/> Add Field
        </Button>
      </div>
    );
  };


   return (
   <div className="w-full">
      {fields.length<1?<div
       onClick={()=>handleAddField()}
       className='text-orange-500 text-xl w-full border-[1px] border-gray-500 rounded-sm pl-5 cursor-pointer p-2 '>
        {"{ }"} <span className='text-sm text-gray-400'>Click to add fields</span>
      </div>:
      renderFields()}
    </div>
  );
}

export default MainCard;
