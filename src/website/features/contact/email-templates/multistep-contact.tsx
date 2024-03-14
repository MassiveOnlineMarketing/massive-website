// Email template for sending contact form submissions to internal email address

import { infer, z } from "zod";
import { formSchema } from "@/lib/data-schema/form";

type FormSchemaType = z.infer<typeof formSchema>;

export function EmailTemplate({ answers }: { answers: FormSchemaType }) {

    console.log(answers, 'answers template')
    // Helper function to format the answers
    const formatAnswers = ({ answers }: { answers: FormSchemaType }) => {
        return Object.entries(answers)
            .map(([key, value]) => {
                // If the value is an array, join it with commas
                const formattedValue = Array.isArray(value) ? value.join(', ') : value
                return `<p><strong>${key}:</strong> ${formattedValue}</p>`
            })
            .join('') // Join all the strings without any separators
    }

    // Prepare the formatted answers as HTML
    const formattedAnswersHtml = formatAnswers({ answers })

    return (
        <div>
            <h1>Nieuwe aanvraag contact</h1>
            <div dangerouslySetInnerHTML={{ __html: formattedAnswersHtml }} />
        </div>
    )
}
