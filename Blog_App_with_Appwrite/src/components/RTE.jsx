import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="m0ysvper7n94rt3kdh3yikp3o566yz8s54o7lxb0625aodhu"
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 350,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            setup: (editor) => {
                                editor.on('init', () => {
                                    const editorContainer = editor.getContainer();
                                    if (editorContainer) {
                                        editorContainer.style.borderColor = '#9CA3AF'; // Tailwind's gray-500
                                    }
                                });
                            },
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;