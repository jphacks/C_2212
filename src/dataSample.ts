


export type sampleDataType = {
	task_class_name: {
		task_name: string,
		scheduled_date: string,
		deadline: string,
		task_name_from?: string ,
		task_name_to: string
	}[];
}

const sample_data: sampleDataType = {
	task_class_name: [
		{
			task_name: "Todo 1",
			scheduled_date: "2022/10/16",
			deadline: "2022/10/22",
			task_name_to: "Todo 2"
		},
		{
			task_name: "Todo 2",
			scheduled_date: "2022/10/17",
			deadline: "2022/10/25",
			task_name_from: "Todo 1",
			task_name_to: "Todo 3"
		},
		{
			task_name: "Todo 3",
			scheduled_date: "2022/10/19",
			deadline: "2022/10/27",
			task_name_from: "Todo 2",
			task_name_to: "Todo 4"
		},
		{
			task_name: "Todo 4",
			scheduled_date: "2022/10/28",
			deadline: "2022/10/30",
			task_name_from: "Todo 3",
			task_name_to: "Todo 5"
		},
		{
			task_name: "Todo 5",
			scheduled_date: "2022/11/01",
			deadline: "2022/11/02",
			task_name_from: "Todo 4",
			task_name_to: "Todo 6"
		}
	]
}

export default sample_data;