import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import InputField from 'components/common/InputField/InputField';
import TextArea from 'components/common/TextAreaField/TextAreaField';
import InputDropdown from 'components/common/InputDropdown/InputDropdown';

interface Props {
    handleSubmit?: any;
    handleChange?: any;
    values?: any;
    options?: any;
    handleChangeFile?: any;
}

const AddCourse = ({ handleChange, handleSubmit, values, options, handleChangeFile }: Props) => {
    return (
        <div className="block__header">
            <div className="block-title" style={{ textAlign: 'center' }}>
                <h3>Add Course</h3>
            </div>
            <form onSubmit={handleSubmit} className="wrapper" style={{ width: '70%' }}>
                <InputField
                    name="courseName"
                    placeholder="* Course Name"
                    text="* = required fields"
                    onChange={handleChange('courseName')}
                    value={values?.courseName}
                    required={true}
                />
                <TextArea
                    name="courseDescription"
                    text="Description"
                    placeholder="Course Description"
                    onChange={handleChange('courseDescription')}
                    value={values?.courseDescription}
                />
                <InputField
                    name="image"
                    text="Upload Image"
                    acceptFile="image/*"
                    type="file"
                    onChange={handleChangeFile('image')}
                    required={true}
                />
                <InputDropdown
                    options={options}
                    onChange={handleChange('category')}
                    value={values?.category}
                    name="category"
                    placeholder="*Category"
                    required
                />
                <button type="submit" className="btn btn--gradient">
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCourse;
