import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const KampanyeItem = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <img
        src="https://clarity-tailwind.preview.uideck.com/images/blog-01.png"
        alt="gambar"
        className="w-full aspect-4/3"
      />
      <h3 className="text-xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <p className="text-md text-slate-600">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum vel
        laborum quos!
      </p>
      <div className="flex items-center">
        <div className="flex gap-x-4 items-center text-slate-600">
          <Avatar className="w-4 h-4">
            <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-01.png" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <p>Adrio Devid</p>
          <p>• Sep 10,2025</p>
        </div>
      </div>
    </div>
  );
};

export default KampanyeItem;
