import React, { useState } from 'react';
import { Modal, Button, Form, Input, Col, Row } from 'antd';

const Contribute = ({ index, contribute }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = (index) => {
        setVisible(true);
        form.setFieldsValue({ amount: undefined });
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const onFinish = (values) => {
        contribute(index, values.amount);
        setVisible(false);
    };

    return (
        <div>
            <span onClick={() => showModal(index)}>Contribute</span>
            <Modal
                title="Contribute"
                open={visible}
                onCancel={handleCancel}
                footer={null}
                width="400px"
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={{
                        // eslint-disable-next-line no-template-curly-in-string
                        required: '${label} is required!',
                    }}
                    preserve={false}
                >
                    <Form.Item name={['amount']} label="Amount" rules={[]}>
                        <Input prefix="Ξ" suffix="ETH" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 0, offset: 5 }}>
                        <Row>
                            <Col span={12}>
                                <Button onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Contribute;
