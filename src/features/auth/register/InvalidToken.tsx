import React from "react";
import InvalidImage from "@/assets/undraw/undraw_cancel_7zdh.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

const InvalidToken = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-8 animate-reveal">
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative animate-float">
          <img
            src={InvalidImage}
            alt="Invalid Token"
            className="w-full h-full object-contain drop-shadow-sm"
            draggable={false}
          />
        </div>

        <div className="space-y-4 w-full">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800">
            Invalid or Expired Token
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
            The registration link you clicked is no longer valid or has
            naturally expired. If you still need to join, please request a new
            invitation below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full px-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full flex-1 md:h-14 border-gray-300"
            variant="outline"
          >
            Explore Product
          </Button>
          <Button
            onClick={() => navigate("/contact")}
            className="w-full flex-1 md:h-14"
          >
            Request Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvalidToken;
