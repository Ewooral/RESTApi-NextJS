export const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Dark transparent overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>
  
        {/* Loading spinner */}
        {/* <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        ></motion.div> */}
        <div className="sk-chase ">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  };



export const RerouteLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dark transparent overlay */}
            <div className="fixed inset-0 bg-black"></div>

            {/* Loading spinner */}
            {/* <motion.div
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        ></motion.div> */}
            <div className="sk-chase ">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    );
};