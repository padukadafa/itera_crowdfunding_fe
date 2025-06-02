import type { Campaign } from "@/models/campaign";
import type { User } from "@/models/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";
// @ts-ignore
import "moment/locale/id";
import { Link } from "react-router-dom";

const KampanyeItem = ({ campaign }: { campaign: Campaign }) => {
  moment.locale("id");
  return (
    <Link to={import.meta.env.VITE_BASE_URL + "/kampanye/" + campaign.id}>
      <div className="flex flex-col gap-y-4">
        <img
          src={
            campaign.image_url ??
            "https://dummyimage.com/600x400/f7f7f7/454545.png&text=Campaign+Image"
          }
          alt="gambar"
          className="w-full aspect-4/3"
        />
        <h3 className="text-xl font-bold">{campaign.title}</h3>
        <p className="text-md text-slate-600">{campaign.description}</p>
        <div className="flex items-center">
          <div className="flex gap-x-4 items-center text-slate-600">
            <Avatar className="w-4 h-4">
              <AvatarImage
                src={
                  campaign.created_by.photo_url ??
                  "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpgs"
                }
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <p>{(campaign.created_by as User).name}</p>
            <p>• {moment(campaign.created_at).format("MMM DD,yyyy")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default KampanyeItem;
