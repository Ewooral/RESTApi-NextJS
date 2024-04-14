interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    isStudent: boolean;
}

export type UserInfoProp = {
    id: any,
    email: string,
    isstudent?: boolean,
    firstname: string,
    lastname: string,
    title: string,
    terms: boolean
}

export function assignUserRole(user: UserInfoProp, isAdmin: boolean, adminKey: string, ADMIN_SECRET_KEY: string): string {
    // If the user logs in as an admin and provides the correct admin key
    if (user.isstudent && isAdmin && adminKey === ADMIN_SECRET_KEY ) {
        return "student";
    } else if (isAdmin && adminKey === ADMIN_SECRET_KEY) {
        return "admin"
    }
    // If the user logs in as an admin but provides an incorrect admin key
    else if (isAdmin) {
        // Fallback to student if registered as a student, otherwise fallback to guest
        return user.isstudent ? "student" : "guest";
    }
    // If the user logs in as a student
    else if (user.isstudent) {
        // Fallback to student regardless of registration status
        return "student";
    }
    // If the user logs in as a guest
    else {
        // Fallback to guest regardless of registration status
        return "guest";
    }
}
  
  