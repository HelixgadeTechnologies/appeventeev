import { useContext,  useState } from "react";
import { CgProfile } from "react-icons/cg";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { timeZones } from "../../utils/utils";
import axios from "axios";

const ProfileSettings = () => {

  const { userDetails, token, userId } = useContext(UserAuthContext);
  console.log(userDetails);


  const { 
    firstname, 
    lastname, 
    email, 
    organisationName, 
    organisationWebsite, 
  } = userDetails;


  const [formData, setFormData] = useState({
    profilePhoto: "",  
    firstName: firstname || "",
    lastName: lastname || "",
    email: email || "",
    gender: "", 
    timeZone: "", 
    country: "",  
    organization: organisationName || "",
    website: organisationWebsite || "",
    organizationSize: "",  
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
   
    try{
      const response = await axios.put(`https://eventeevapi.onrender.com/user/updateuser/${userId}`, formData,
        {
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('user profile updated successfully', response);
 
    }catch(error){
      console.error(error.message);
      
    }
  };

  return (
    <div className="mx-auto mt-5 bg-white p-5 rounded-lg shadow grid settingsGrid h-fit">
  {/* Name and photo */}
  <div className="flex items-center gap-4 mb-5 pr-4">
    <div className="mb-4">
      <CgProfile size={80} />
    </div>
    <div className="flex flex-col justify-center gap-1">
      <p className="text-sm font-semibold">{`${firstname} ${lastname}`}</p>
      <p className="font-light text-xs">{email}</p>
    </div>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
          />
        </div>
      </div>

      {/* Email and gender */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-xs"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Timezone and country */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-medium">Time Zone</label>
          <select
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
          >
            <option value="">Select Time Zone</option>
            {timeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Organization details */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-xs font-medium">Organization Name</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Organization Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
          />
        </div>
      </div>

      {/* Organization Size */}
      <div className="mt-4">
        <label className="block text-xs font-medium">Organization Size</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-md text-xs focus:border-[#f56630] focus:ring-1 focus:ring-[#f56630]"
        >
          <option>1 - 20</option>
          <option>21 - 50</option>
          <option>51 - 100</option>
          <option>100+</option>
        </select>
      </div>
    </div>

    {/* Button */}
    <div className="flex justify-end mt-4">
      <button
        type="submit"
        className="px-4 py-2 bg-[#f56630] text-white rounded-md text-xs hover:bg-[#d65428] transition-colors"
      >
        Save Changes
      </button>
    </div>
  </form>
</div>

  
  );
};

export default ProfileSettings;
