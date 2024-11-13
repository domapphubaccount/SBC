import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_code_error, set_stored_code, clear_code_error } from "@/app/Redux/Features/Code/CodeSlice";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CodeSelector() {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const available = useSelector((state) => state.chatSlice.chat_code);


  const [selectedSection, setSelectedSection] = React.useState(null);
  const [selectedPdfs, setSelectedPdfs] = React.useState([]);

  const handleSectionChange = (event) => {
    const sectionId = event.target.value;
    const section = code.find((item) => item.id === sectionId || item.id === parseInt(sectionId));
    setSelectedSection(section || null);
    setSelectedPdfs([]); // Reset PDF selection when a new section is chosen
  };

  // const handlePdfChange = (event, newValue) => {
  //   console.log(newValue)
  //   if (newValue.length <= 5) {
  //     setSelectedPdfs(newValue);
  //   } else {
  //     dispatch(set_code_error("You can’t select more than 5 PDFs"));
  //     setTimeout(() => dispatch(clear_code_error()), 1500);
  //   }
  // };

  const handlePdfChange = (fileId) => {
    if (!available) {
      if (storedCode.length < 6) {
        dispatch(set_stored_code(fileId));
      }else{
        dispatch(set_code_error('You cant check more than 5 files'));
        setTimeout(()=>{dispatch(clear_code_error())} , 1500)
      }
    }
  };

  console.log(storedCode)
  return (
    <div className="w-full p-4">
      {/* Section Selector */}
      <label htmlFor="section-selector" className="block text-gray-700 font-medium mb-2">
        Choose Section
      </label>
      <select
        id="section-selector"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        onChange={handleSectionChange}
        value={selectedSection ? selectedSection.id : ""}
      >
        <option value="" disabled>Select Section</option>
        {code.map((section) => (
          <option key={section.id} value={section.id}>
            {section.name}
          </option>
        ))}
      </select>

      {/* PDF Selector using Autocomplete */}
      {selectedSection && (
        <div>
          <label htmlFor="pdf-selector" className="block text-gray-700 font-medium mb-2">
            Choose PDFs
          </label>
          <Autocomplete
            multiple
            id="pdf-selector"
            options={selectedSection.pdfs}
            getOptionLabel={(pdf) => pdf.name}
            value={selectedPdfs}
            onChange={(e,v)=>handlePdfChange(v[0]?.id)}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Choose PDFs" placeholder="Select up to 5" />
            )}
          />
        </div>
      )}
    </div>
  );
}
