import { useState, useRef } from "react";

const ACCEPT_TYPE = ["audio/mpeg", "audio/wav", "audio/mp4", "video/mp4", "audio/x-m4a"];
const Max_Size_MB = 100;

function UplaodBox({OnFileSelected}){
    const[isDragging, setIsDragging] = useState(false);
    const[error, setError] = useState("");
    const inputref = useRef(null); 
}