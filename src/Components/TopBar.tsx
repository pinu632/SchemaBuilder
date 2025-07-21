import React from 'react'
import { Download, FileJson } from 'lucide-react'
import { useSchema } from '@/store/store'
import ExportJson from '@/utilFunction/ExportJson'

function TopBar() {
  const { nestedObject } = useSchema()
  return (
    <div className='w-full h-16 text-white flex  justify-between items-center text-lg   px-5'>
      <div className='flex gap-1'>
        <FileJson className='text-purple-400' /> SchemaBuilder
      </div>
      <button
        onClick={() => ExportJson(nestedObject)}
        className='text-xs flex justify-center items-center p-2 gap-2 border border-gray-400 rounded-sm cursor-pointer 
             hover:bg-gray-800 hover:text-white hover:border-white transition-colors duration-200'
      >
        <Download size={20} />
        Export JSON
      </button>

    </div>
  )
}

export default TopBar