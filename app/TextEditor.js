import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleTitle: '',
            editorState: EditorState.createEmpty(),
        }

        this.onChange = (editorState) => (
            this.setState({ editorState })
        );

        this.focus = () => this.refs.editor.focus();

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (event) => this._onTab(event);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }

    _onTab(event) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(event, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }

    render() {
        const { editorState } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
          const contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }


        return (
        <div className="RichEditor-root">
    
            <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
            />

            <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            />
            
            <div className={className} onClick={this.focus}>
                <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Enter text here..."
                ref="editor"
                spellCheck={true}
                />
            </div>

            <div className="submit-button-container">
                <button
                className="submit-button"
                type="submit"
                onClick={() => {
                    console.log('innerHTML:', this.refs.editor.editor.innerHTML)
                    console.log('innerText:', this.refs.editor.editor.innerText)
                }
            }
                >Publish</button>
            </div>

        </div>
        )
    }

}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}


export default TextEditor;