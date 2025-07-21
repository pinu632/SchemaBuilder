
import { useSchema } from '@/store/store';
import  { type JSX } from 'react'
// import nestedObject from '@/DemoData/Data';

type JSONData  = number | string | boolean | null | { [key: string]: JSONData } | JSONData[] |object;


export type Props ={
  obj:JSONData
}


export function getColorByType(value: unknown): string {
 const type = String(value)

 

  if (value === null) return "#9CA3AF"; // gray for null
  if (Array.isArray(value)) return "#F59E0B"; // amber for arrays

  switch (type.toLowerCase()) {
    case "string":
      return "#10B981"; // green
    case "number":
      return "#3B82F6"; // blue
    case "boolean":
      return "#EF4444"; // red
    case "object":
      return "#8B5CF6"; // purple
    case "undefined":
      return "#6B7280"; // dark gray
    case "function":
      return "#E879F9"; // pink
    case "symbol":
      return "#14B8A6"; // teal
    default:
      return "#FFFFFF"; // white fallback
  }
}




const RecursiveRenderer = ({ obj }: Props): JSX.Element => {
  const renderObject = (Value: JSONData, depth: number = 1): JSX.Element => {
    const padding = { paddingLeft: `${depth}px`, color: getColorByType(Value) };

    if (Value === null || typeof Value !== "object") {
      return <span style={padding}>{typeof Value === "string" ? `"${Value}"` : String(Value)},</span>;
    }

    if (Array.isArray(Value)) {
  const isPrimitiveArray = Value.every(
    item => typeof item !== "object" || item === null
  );

  if (isPrimitiveArray) {
    return (
      <span style={{ paddingLeft: `${depth * 5}px` }}>
        [ {Value.map((item, index) => (
          <span key={index} style={{ color: getColorByType(item) }}>
            {JSON.stringify(item)}
            {index < Value.length - 1 && ', '}
          </span>
        ))} ],
      </span>
    );
  }

  
  return (
    <div style={{ paddingLeft: `${depth * 5}px` }}>
      [
      {Value.map((item, index) => (
        <div key={index} style={{ paddingLeft: `${(depth + 1) * 5}px` }}>
          {renderObject(item, depth + 1)}
        </div>
      ))}
      ],
    </div>
  );
}


    return (
      <div style={{ paddingLeft: `${depth * 15}px` }}>
        {"{"}
        {Value &&
          Object.entries(Value).map(([key, val]) => (
            <div key={key}>
              <span style={{ paddingLeft: `${(depth + 1) * 5}px` }}>
                <strong style={{ color: "#F472B6" }}>"{key}"</strong>:{" "}
                <span style={{ color: getColorByType(val) }}>{renderObject(val, depth + 1)}</span>
                
              </span>
            </div>
          ))}
        {"}"}
      </div>
    );
  };

  return <div>
    {renderObject(obj)}
    </div>;
};



function PreviewSecion() {
 const {nestedObject} = useSchema()

  

  
  return (
      <div className="bg-[#1e1e1e]/50 h-fit w-fit min-w-full min-h-full sm:h-full sm:w-full   text-white  px-12 py-12 rounded-tl-xl rounded-t-xl sm:rounded-t-0 flex text-sm font-mono ">
    {
     <RecursiveRenderer obj={nestedObject} />
    }
    </div>
  )
}

export default PreviewSecion