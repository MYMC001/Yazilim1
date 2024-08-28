import prismadb from "@/lib/prismadb";

export const getTotalApplications = async (jobId: string) => {

    //Get the total applications
    //Count all the different applications ids that are in the given job
    
    const applications = await prismadb.application.findMany({
        where: {
            jobId: jobId
        }
    });
    

    return applications.length;
};
