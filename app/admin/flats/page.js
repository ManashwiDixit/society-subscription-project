"use client";

import ReactPaginate from "react-paginate";
import FlatsTable from "@/components/tables/FlatsTable";
import AddFlatModal from "@/components/modals/AddFlatModal";
import {useState, useEffect} from "react";

export default function FlatsPage(){

    const [search, setSearch] = useState("");
    const flatsPerPage = 5;
    const [itemOffset , setItemOffset] = useState(0);

    const [openModal, setOpenModal] = useState(false);

    const [selectedFlat, setSelectedFlat] = useState(null);

   const [flats, setFlats] = useState([]);
   
   useEffect(() => {
      const token = localStorage.getItem("token");
       fetch("http://localhost:5000/api/flats",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
       })
         .then(res => res.json())
         .then(data => {
          // console.log("Flats from api:", data); 
          // console.log("TOKEN USED:", token);

         
    
            setFlats(data)})
         .catch(err => console.log(err));
       }, []);
   
    //filtered data logic
     const filteredFlats = flats.filter((flat) =>{
        if(!search ) return true;
        return(
             (flat.flatNumber || "").toLowerCase().includes(search.toLowerCase()) ||
             (flat.owner || "").toLowerCase().includes(search.toLowerCase())
           );

        
     });
    

     //to calculate current flats
     const endOffset = itemOffset + flatsPerPage;
     const currentFlats = filteredFlats.length>0
     ? filteredFlats.slice(itemOffset,endOffset) : [];

     //total pages
     const pageCount = Math.max(1, Math.ceil(filteredFlats.length/flatsPerPage));

     const handleAddFlat = async (newFlat) => {
         try {
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);

         const res = await fetch("http://localhost:5000/api/flats", {
         method: "POST",
         headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
         },
         body: JSON.stringify(newFlat)
        });

        const data = await res.json();
        console.log("new flat response", data);
        if(data.error){
            alert(data.error)
            return;
        }
        const updated = await fetch("http://localhost:5000/api/flats", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        const updatedData = await updated.json();

        setFlats(updatedData);
        //reset pagination
        setItemOffset(0);


      

  } catch (err) {
    console.log(err);
  }

     };

     //handle page chnage
     const handlePageClick = (event) => {

     const newOffset =
     (event.selected * flatsPerPage) %
     filteredFlats.length;

      setItemOffset(newOffset);

      };
 
    const handleDeleteFlat = async (id)=>{
        try{
          const token = localStorage.getItem("token");
            await fetch(`http://localhost:5000/api/flats/${id}`, {
                method: "DELETE",
                headers:{
                  Authorization: `Bearer ${token}`
                }
            });

            setFlats((prev)=>(prev.filter((f)=>(f.id !== id))));

        }  catch(err){
            console.log(err);
        }
    };
  
      const handleEditFlat = async (updatedFlat) => {
     try {
      const token = localStorage.getItem("token")
      const res = await fetch(
      `http://localhost:5000/api/flats/${updatedFlat.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFlat)
      }
    );

    const data = await res.json();

    setFlats(prev =>
      prev.map(f => (f.id === data.id ? data : f))
    );

    } catch (err) {
    console.log(err);
     }
    


     };

 

    
    return(
      <div className="p-6"> 
      
        {/* page title */}

        <h1 className="text-2xl font-bold mb-6">
            Flats Management
        </h1>

        {/* to add flat button */}
        <div className="flex items-center gap-4 mb-4">

        <input
        type="text"
        placeholder="Search flats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-4 py-2 w-64"
        />

        <button
        onClick={()=>{
        setSelectedFlat(null);
        setOpenModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
        + Add Flat
        </button>

      

        </div>

        {/* flats table */}

        <FlatsTable flats = {currentFlats}  onDelete = {handleDeleteFlat}
         onEdit = {(flat) => {
                 setSelectedFlat(flat);
                 setOpenModal(true);
            }}/>
        <AddFlatModal
           isOpen={openModal}
           onClose={()=>{setOpenModal(false);
                        setSelectedFlat(null);
           }}
           onAddFlat={handleAddFlat}
             onEditFlat={handleEditFlat}
          
           editFlat={selectedFlat}
        />

         <ReactPaginate
           breakLabel="..."
           nextLabel="Next >"
           previousLabel="< prev"
           onPageChange={handlePageClick}
           pageCount={pageCount}
           pageRangeDisplayed={3}

           containerClassName="flex justify-center gap-2 mt-4"
           pageClassName="border px-3 py-1 rounded"
           activeClassName="bg-blue-600 text-white"
           previousClassName="border px-3 py-1 rounded"
           nextClassName="border px-3 py-1 rounded"

         />


           

      </div>
    );
}