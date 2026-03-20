"use client";

import ReactPaginate from "react-paginate";
import FlatsTable from "@/components/tables/FlatsTable";
import AddFlatModal from "@/components/modals/AddFlatModal";
import {useState} from "react";

export default function FlatsPage(){

    const [search, setSearch] = useState("");
    const flatsPerPage = 5;
    const [itemOffset , setItemOffset] = useState(0);

    const [openModal, setOpenModal] = useState(false);

    const [selectedFlat, setSelectedFlat] = useState(null);

   

    const [flats , setFlats] = useState([
        {
        id:1,
        flat:"A101",
        type:"2BHK",
        owner:"Rahul Sharma",
        email:"rahul@email.com",
        phone:"9876543210",
        status:"Occupied"
    },
    {
        id:2,
        flat:"B203",
        type:"1BHK",
        owner:"Priya",
        email:"priya@email.com",
        phone:"9876111111",
        status:"Vacant"
    },
    {
        id:3,
        flat:"C302",
        type:"2BHK",
        owner:"Amit Verma",
        email:"amit@email.com",
        phone:"9222224321",
        status:"Occupied"

    },
    {
        
        id:4,
        flat:"D401",
        type:"2BHK",
        owner:"Sneha Gupta",
        email:"sneha@email.com",
        phone:"9876543211",
        status:"Vacant"

    },
    {
        id:5,
        flat:"A203",
        type:"3BHK",
        owner:"saloni rana",
        email:"saloni@email.com",
        phone:"3452167891",
        status:"Vacant"

    },
    {
        id:6,
        flat:"B301",
        type:"1BHK",
        owner:"Yashika singh",
        email:"yashika@email.com",
        phone:"1233214532",
        status:"Occupied"
    }
    ]);
    //filtered data logic
     const filteredFlats = flats.filter((flat) =>
     flat.flat.toLowerCase().includes(search.toLowerCase()) ||
     flat.owner.toLowerCase().includes(search.toLowerCase())
     );

     //to calculate current flats
     const endOffset = itemOffset + flatsPerPage;
     const currentFlats = filteredFlats.slice(itemOffset,endOffset);

     //total pages
     const pageCount = Math.ceil(filteredFlats.length/flatsPerPage);

     const handleAddFlat = (newFlat) => {

     const exists = flats.find((f) => f.id === newFlat.id);

     if (exists) {
     const updatedFlats = flats.map((f) =>
      f.id === newFlat.id ? newFlat : f
     );

     setFlats(updatedFlats);
     } else {
     setFlats([...flats, newFlat]);
     }
     };

     //handle page chnage
     const handlePageClick = (event) => {

     const newOffset =
     (event.selected * flatsPerPage) %
     filteredFlats.length;

      setItemOffset(newOffset);

      };
 
    const handleDeleteFlat = (id)=>{
        const updatedFlats = flats.filter((flat)=>flat.id !==id);
        setFlats(updatedFlats);
    };
    const handleEditFlat = (flat) => {
    setSelectedFlat(flat);
    setOpenModal(true);
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

        <FlatsTable flats = {currentFlats} onDelete = {handleDeleteFlat}
         onEdit = {handleEditFlat}/>
        <AddFlatModal
           isOpen={openModal}
           onClose={()=>{setOpenModal(false);
                        setSelectedFlat(null);
           }}
           onAddFlat={handleAddFlat}
          
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