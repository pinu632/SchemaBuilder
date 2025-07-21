function ExportJson(data: object, filename: string = "schema.json") {
    const jsonstr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonstr], { type: 'application/json' })
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);


}

export default ExportJson