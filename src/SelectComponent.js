import React from "react";
import { useEffect, useState } from "react";
import withClickOutside from "./withClickOutside";

const SelectComponent = React.forwardRef(({options, placeholder ="", onChange, selectedKey, open, setOpen},ref)=>{
    const [inputValue, setInputValue] = useState("");

    useEffect (() => {
        if(selectedKey) {
            setInputValue(options.find((o) => o.key === selectedKey).value)
        }
    }, [selectedKey])

    useEffect(() => {
        if (!open && options.findIndex((o) => o.value === inputValue) === -1) {
            if (!inputValue) {
                onChange("");
            } else {
                if(selectedKey){
                    setInputValue(options.find(o => o.key === inputValue).value)}
                    else {
                        setInputValue("");
                    }
            }
        }
    },[inputValue, onChange, open, options, selectedKey])
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const onItemSelected = (option) => {
        onChange !== undefined && onChange(option.key);
        onChange !== undefined && setInputValue(option.value);
        setOpen(false);
    }
    const clearDropdown = () => {
        setInputValue("");
        onChange("");
    };
    const onInputClick = () => {
        setOpen(true);
    }
    return <div className="dropdown-container" ref={ref}>
        <div onClick={onInputClick} className="input-container">
            <input type="text" value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
            />
            <div className="input-arrow-container">
                <i className="input-arrow"></i>
            </div>
            {selectedKey || inputValue ? <div onClick = {clearDropdown} className="input-clean-container">
                x
            </div>: null}
        </div>
        <div  className={`dropdown ${open ? "visible" : ""}`}>
            {options.filter((item) => { const searchItem = inputValue.toLocaleLowerCase();
            const v = item.value.toLocaleLowerCase();
            if (!searchItem) return true;
            return v.startsWith(searchItem);
            })
            .map((opt) => {
               return ( <div key={opt.key} onClick={()=> onItemSelected(opt)} className="option">
                    {opt.value}
                </div>
                )
            })}
        </div>
        
    </div>
});

export default withClickOutside(SelectComponent);
