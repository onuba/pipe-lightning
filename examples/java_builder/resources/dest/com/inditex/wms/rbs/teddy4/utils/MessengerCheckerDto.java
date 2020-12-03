package com.inditex.wms.rbs.teddy4.utils;

/**
 * This is an example of generate a Java DTO POJO with GOF builder pattern
 *
 * @author onuba
 */
public class MessengerCheckerDto {

  
    /**
     * Field Emulator
     */
    private String emulator;
  
    /**
     * Field VerifyClass
     */
    private Class<?> verifyClass;
  
    /**
     * Field MethodName
     */
    private String methodName;


    private MessengerCheckerDto(methodNameBuilder builder) { 

        this.emulator = builder.emulator;
        this.verifyClass = builder.verifyClass;
        this.methodName = builder.methodName;
        
    }

    /**
     * Get Field Emulator
     */
    public String getEmulator() {
        return emulator;
    }
    
    /**
     * Get Field VerifyClass
     */
    public Class<?> getVerifyClass() {
        return verifyClass;
    }
    
    /**
     * Get Field MethodName
     */
    public String getMethodName() {
        return methodName;
    }
    

    public static MessengerCheckerDtoBuilder builder() {
        return new MessengerCheckerDtoBuilder();
    }

    public static class MessengerCheckerDtoBuilder {

        private String emulator;
        private Class<?> verifyClass;
        private String methodName;
    
      
        public MessengerCheckerDtoBuilder emulator(String emulator) {
            this.emulator = emulator;
            return this;
        }
      
        public MessengerCheckerDtoBuilder verifyClass(Class<?> verifyClass) {
            this.verifyClass = verifyClass;
            return this;
        }
      
        public MessengerCheckerDtoBuilder methodName(String methodName) {
            this.methodName = methodName;
            return this;
        }
    

        public MessengerCheckerDto build() {
            return new MessengerCheckerDto(emulator,
                verifyClass,
                methodName);
        }
    }
}