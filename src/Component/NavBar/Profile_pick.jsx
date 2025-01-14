import React, { useState, useRef, useEffect } from "react";
import profile_img_placeholder from "../../assets/profile_pick.png";
import { RiUploadCloud2Fill } from "react-icons/ri";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile_pick = () => {
  const [profilepick, setProfilepick] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(profile_img_placeholder);
  const [userName, setUserName] = useState("");
  const cropperRef = useRef(null);
  const auth = getAuth();
  const db = getDatabase();

  // Fetch user data from Firebase (name and profile image)
  const fetchProfileData = () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const nameRef = ref(db, `users/${userId}/name`);
      const imageRef = ref(db, `users/${userId}/profileImage`);

      // Fetch user's name
      get(nameRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserName(snapshot.val());
            
          } else {
            console.log("No name found, setting default.");
            setUserName(user.displayName || "User");
          }
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });

      // Fetch profile image
      get(imageRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setProfileImage(snapshot.val());
          } else {
            console.log("No profile image found, setting default.");
          }
        })
        .catch((error) => {
          console.error("Error fetching profile image:", error);
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const cropper = cropperRef.current.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas()?.toDataURL();
      if (croppedImage) {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const imageRef = ref(db, `users/${userId}/profileImage`);
          set(imageRef, croppedImage)
            .then(() => {
              toast.success("Profile image saved successfully!");
              setProfileImage(croppedImage);
              setProfilepick(false);
            })
            .catch((error) => {
              console.error("Error saving image:", error);
              toast.error("Error saving image. Please try again.");
            });
        } else {
          toast.error("User is not logged in.");
        }
      } else {
        toast.error("No cropped image available.");
      }
    }
  };

  useEffect(() => {
    fetchProfileData(); // Fetch user data on component load
  }, []);

  return (
    <section className="relative">
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      {profilepick && (
        <div className="w-[300px] h-auto md:w-[450px] md:h-[500px] md:left-[150px] lg:w-[800px] lg:h-[500px] bg-slate-200 dark:bg-slate-950 absolute left-[10px] lg:left-[400px] top-[60px] lg:top-[100px] p-1 lg:p-4 z-50 rounded-lg flex flex-col items-center justify-center">
          <h2 className="mb-2 text-[18px] md:text-[24px] font-semibold font-Poppins text-blue ">
            Upload Your Profile Picture
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {image && (
            <div className="w-full max-w-[300px] sm:max-w-[600px] md:max-w-[800px] mx-auto">
              <Cropper
                src={image}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                ref={cropperRef}
              />
            </div>
          )}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 mt-2 text-white rounded font-Poppins bg-blue text-[20px]"
            >
              Save
            </button>
            <button
              className="px-4 py-2 mt-2 text-white rounded font-Poppins bg-blue text-[20px]"
              onClick={() => setProfilepick(!profilepick)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div
        onClick={() => setProfilepick(!profilepick)}
        className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center group relative cursor-pointer mt-4"
      >
        <RiUploadCloud2Fill className="text-[50px] group-hover:absolute z-10 group-hover:text-white" />
        <img
          className="group-hover:brightness-50 w-[100px] h-[100px] rounded-full"
          src={profileImage}
          alt="Profile Image"
        />
        <span className="text-sm text-white">
          {userName || "User"} 
        </span>
      </div>
    </section>
  );
};

export default Profile_pick;
