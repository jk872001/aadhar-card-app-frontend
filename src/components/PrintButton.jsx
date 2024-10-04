
const PrintButton = ({ imageUrl }) => {
  const handlePrint = () => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const newWindow = window.open('');
      newWindow.document.write('<img src="' + imageUrl + '" style="width:100%;" />');
      newWindow.print();
    };
  };

  return (
    <div>
      <button onClick={handlePrint}>Print Image</button>
    </div>
  );
};

export default PrintButton;
