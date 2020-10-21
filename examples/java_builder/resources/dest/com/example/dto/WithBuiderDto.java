package com.example.dto;

/**
 * This is an example of generate a Java DTO POJO with GOF builder pattern
 *
 * @author onuba
 */
public class WithBuiderDto {

  
    /**
     * Field Id
     */
    private Long id;
  
    /**
     * Field Field1
     */
    private Integer field1;
  
    /**
     * Field Field2
     */
    private String field2;
  
    /**
     * Field Field3
     */
    private Double field3;
  
    /**
     * Field Field4
     */
    private Float field4;
  
    /**
     * Field FieldCool
     */
    private Boolean fieldCool;
  
    /**
     * Field List
     */
    private List<String> list;
  
    /**
     * Field Map
     */
    private Map<String, String> map;
  
    /**
     * Field Obj
     */
    private CustomObject obj;


    private WithBuiderDto(Long id,
        Integer field1,
        String field2,
        Double field3,
        Float field4,
        Boolean fieldCool,
        List<String> list,
        Map<String, String> map,
        CustomObject obj) { 

        this.id = id;
        this.field1 = field1;
        this.field2 = field2;
        this.field3 = field3;
        this.field4 = field4;
        this.fieldCool = fieldCool;
        this.list = list;
        this.map = map;
        this.obj = obj;
        
    }

    /**
     * Get Field Id
     */
    public Long getId() {
        return id;
    }
    
    /**
     * Get Field Field1
     */
    public Integer getField1() {
        return field1;
    }
    
    /**
     * Get Field Field2
     */
    public String getField2() {
        return field2;
    }
    
    /**
     * Get Field Field3
     */
    public Double getField3() {
        return field3;
    }
    
    /**
     * Get Field Field4
     */
    public Float getField4() {
        return field4;
    }
    
    /**
     * Get Field FieldCool
     */
    public Boolean getFieldCool() {
        return fieldCool;
    }
    
    /**
     * Get Field List
     */
    public List<String> getList() {
        return list;
    }
    
    /**
     * Get Field Map
     */
    public Map<String, String> getMap() {
        return map;
    }
    
    /**
     * Get Field Obj
     */
    public CustomObject getObj() {
        return obj;
    }
    

    public static WithBuiderDtoBuilder builder() {
        return new WithBuiderDtoBuilder();
    }

    public static class WithBuiderDtoBuilder {

        private Long id;
        private Integer field1;
        private String field2;
        private Double field3;
        private Float field4;
        private Boolean fieldCool;
        private List<String> list;
        private Map<String, String> map;
        private CustomObject obj;
    
      
        public WithBuiderDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }
      
        public WithBuiderDtoBuilder field1(Integer field1) {
            this.field1 = field1;
            return this;
        }
      
        public WithBuiderDtoBuilder field2(String field2) {
            this.field2 = field2;
            return this;
        }
      
        public WithBuiderDtoBuilder field3(Double field3) {
            this.field3 = field3;
            return this;
        }
      
        public WithBuiderDtoBuilder field4(Float field4) {
            this.field4 = field4;
            return this;
        }
      
        public WithBuiderDtoBuilder fieldCool(Boolean fieldCool) {
            this.fieldCool = fieldCool;
            return this;
        }
      
        public WithBuiderDtoBuilder list(List<String> list) {
            this.list = list;
            return this;
        }
      
        public WithBuiderDtoBuilder map(Map<String, String> map) {
            this.map = map;
            return this;
        }
      
        public WithBuiderDtoBuilder obj(CustomObject obj) {
            this.obj = obj;
            return this;
        }
    

        public WithBuiderDto build() {
            return new WithBuiderDto(id,
                field1,
                field2,
                field3,
                field4,
                fieldCool,
                list,
                map,
                obj);
        }
    }
}