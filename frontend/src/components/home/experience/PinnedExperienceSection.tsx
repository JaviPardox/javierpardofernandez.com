import { useState, useEffect, ReactNode } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { startLoading, finishLoading, setError } from '../../../store/loadingSlice';
import api from "../../../api/axios";
import { WorkExperience } from "../../../types";
import PinnedExperienceContent from "./PinnedExperienceContent";

interface PinnedExperienceSectionProps {
    title?: ReactNode;
}

const PinnedExperienceSection = ({ title }: PinnedExperienceSectionProps) => {
    const [workExperience, setWorkExperience] = useState<WorkExperience | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const resourceId: string = 'pinned-experience-section';

    useEffect(() => {
        const fetchExperience = async () => {
            dispatch(startLoading(resourceId));

            try {
                const response = await api.get<WorkExperience>(`/job-info`);
                setWorkExperience(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching experience:", error);
                dispatch(setError({
                    resource: resourceId,
                    error: "Failed to fetch job experience. Please try again later."
                }));
                setErrorMessage((error as Error).message);
                setLoading(false);
            } finally {
                dispatch(finishLoading(resourceId));
            }
        };

        fetchExperience();

        return () => {
            dispatch(finishLoading(resourceId));
        };
    }, [dispatch]);

    if (loading)
        return (
            <div className="flex justify-center items-center pt-[15vh] min-h-screen">
                <div
                    className="w-16 h-16 border-8 rounded-full animate-spin"
                    style={{
                        borderColor: "transparent",
                        borderTopColor: "rgba(20, 184, 166, 0.7)",
                        borderRightColor: "rgba(13, 148, 136, 0.9)",
                        borderBottomColor: "rgba(19, 78, 74, 1)",
                    }}
                ></div>
            </div>
        );

    if (error) return <div className="text-red-500 text-center">{error}</div>;

    if (!workExperience)
        return (
            <div className="text-red-500 text-center">
                Error - Data fetching not executed
            </div>
        );

    return <PinnedExperienceContent experiences={workExperience.data} title={title} />;
};

export default PinnedExperienceSection;

