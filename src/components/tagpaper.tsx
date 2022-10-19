
import "./tagpaper.css"

        const props =  [
            {
                scheduled_date: "10/23(Thu)",
                task_name: "FocusGold IA"
            }
        ]

        const TagPaper = (props: any) => {
            return (
                <div className="tag_contents" >
                    <p>{props.scheduled_date}</p>
                    <p>{props.task_name}</p>
                </div>
            )
        }

export default TagPaper;