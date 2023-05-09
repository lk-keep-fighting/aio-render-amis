import { request, useMatch } from '@umijs/max';
import styles from './index.less';
import PageDesinger from '@/components/PageDesigner';
import { Button, Divider, Input, Typography, Modal, Space, message } from 'antd';
import { useMemo, useState } from 'react';
import { Editor, InputJSONSchema, JSONSchemaEditor } from 'amis-ui'
import copy from 'copy-to-clipboard';
import { BulbOutlined } from '@ant-design/icons';

const HomePage: React.FC = (props) => {
    const match = useMatch('/setting/page/:id');
    const pageId = match?.params.id;
    const [jsonSchema, setJsonSchema] = useState({})
    useMemo(() => request(`/config/pages/${pageId}.json`).then(res => setJsonSchema(res)), [pageId]);
    const [preview, setPreview] = useState(false);
    const [showAssistant, setShowAssistant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [AIGCJson, setAIGCJson] = useState('');
    const { Text } = Typography;
    return (
        <div className={styles.container}>
            <Space style={{ margin: '5px', float: 'right' }}>
                <Button key={0} onClick={() => setShowAssistant(true)}>小助手</Button>
                <Button key={1} onClick={() => setPreview(!preview)}>{preview ? '编辑' : '预览'}</Button>
                <Button key={2} type='primary' onClick={e => { copy(JSON.stringify(jsonSchema)) }}>复制配置</Button>
            </Space>
            <Divider style={{ margin: '0px' }} />
            <PageDesinger pageSchmea={jsonSchema} preview={preview} onChange={v => setJsonSchema(v)} style={{ height: '100vh' }} />
            <Modal open={showAssistant}
                confirmLoading={isLoading}
                title='配置生成小助手(Beta)'
                cancelText='取消'
                okText='使用配置'
                width={800}
                onOk={() => {
                    setShowAssistant(false);
                    setJsonSchema(JSON.parse(AIGCJson));
                }}
                onCancel={() => setShowAssistant(false)}
            >
                <Input.TextArea style={{ margin: '5px' }} placeholder='输入一段需求，如"生成一个任务管理界面，任务信息包含任务号id、时间time、负责人mgr_user' onChange={v => setPrompt(v.target.value)} />
                <Button
                    loading={isLoading}
                    onClick={() => {
                        if (prompt.length == 0) {
                            message.warning('请输入一段需求提示')
                            return;
                        }
                        setShowAssistant(true)
                        setIsLoading(true);
                        request('/openai/v1/chat/completions', {
                            method: 'post',
                            headers: {
                                Authorization: 'Bearer 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'
                            },
                            data: {
                                "model": "gpt-3.5-turbo",
                                "messages": [
                                    {
                                        "role": "system",
                                        "content": "你是一个amis配置文件生成器，帮我生成json配置文件"
                                    },
                                    {
                                        "role": "user",
                                        "content": prompt
                                    }
                                ]
                            }
                        }).then(res => {
                            let cnt: string = res.choices[0].message.content;
                            setIsLoading(false);
                            let startIdx = cnt.indexOf('```')
                            let endIdx = cnt.lastIndexOf('```')
                            let json = cnt.substring(startIdx + 7, endIdx);
                            console.log(json)
                            setAIGCJson(json)
                        })
                    }}
                    icon={<BulbOutlined />}
                    type='primary'
                    style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}
                >生成配置↓</Button>
                <Editor value={AIGCJson} onChange={(v) => setAIGCJson(v)} height={300} language='json'
                    options={{
                        lineNumbers: 'off'
                    }}
                />
            </Modal>
        </div>
    );
};

export default HomePage;
