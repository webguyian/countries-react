const DescriptionList = ({ items }) => {
  return (
    <dl className="text-sm">
      {items.map((item) =>
        item.value ? (
          <div key={item.key} className="flex mb-2">
            <dt className="font-bold mr-2">{item.key}:</dt>
            <dd>{item.value}</dd>
          </div>
        ) : null
      )}
    </dl>
  );
};

export default DescriptionList;
