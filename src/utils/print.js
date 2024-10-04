export const handlePrint = (url) => {
    let imageUrl=url;
    // Create a new image element
    const img = new Image();

    // Set the src attribute to the image URL
    img.src = imageUrl

    // Wait for the image to load before printing
    img.onload = () => {
      // Create a new window to print the image
      const printWindow = window.open('', '_blank');
      
      // Append the image to the print window
      printWindow.document.write('<html><head><title>Print Image</title></head><body>');
      printWindow.document.write(`<img src="${imageUrl}" style="max-width: 100%;" />`);
      printWindow.document.write('</body></html>');
      
      // Close the document
      printWindow.document.close();
      
      // Print the window
      printWindow.print();
    };
  };