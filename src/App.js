import DynamicForm from "./Pages/DynamicForm";
import CheckingForm from "./Pages/CheckingForm"


const App = () => {
  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="App">
      <DynamicForm
        onSubmit={handleSubmit}
        initialValues={{
          users: [{}],
        }}
        />
        <CheckingForm/>
        
    </div>

    
  );
};

export default App;
