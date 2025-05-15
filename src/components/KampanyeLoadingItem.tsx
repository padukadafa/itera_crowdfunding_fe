const KampanyeLoadingItem = () => {
  return (
    <div className="flex flex-col gap-y-4 animate-pulse bg-white p-4 rounded shadow">
      <div className="bg-gray-300 h-48 w-full rounded" />
      <div className="h-6 bg-gray-300 w-3/4 rounded" />
      <div className="h-4 bg-gray-300 w-full rounded" />
      <div className="h-4 bg-gray-200 w-1/2 rounded" />
      <div className="flex gap-x-4 items-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="h-4 bg-gray-300 w-1/3 rounded" />
      </div>
    </div>
  );
};

export default KampanyeLoadingItem;
