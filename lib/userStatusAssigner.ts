export  const userStatusAssigner = (user: any, role: string): string => {
    switch (role) {
        case "Admin":
        case "Student":
            return "Active";
        case "Applicant":
            return "Pending";
        default:
            return "Temporary";
    }
};
