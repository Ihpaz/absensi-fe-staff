"use client"

 function Avatar(props:any){

       return (
        <div className="relative w-50 h-50">
            <img className="object-cover rounded-full w-36 h-36" 
                src={props.data}
                alt=""
            />
        </div>
        
    )
}

export default Avatar