package com.inditex.wms.rbs.teddy4.dto;

/**
 * Validate WorkOrder DTO
 *
 * @author fhernandezs
 */
public class ValidateWorkOrderDto {

  
    /**
     * Field WorkOrderId
     */
    private Long workOrderId;
  
    /**
     * Field WaveId
     */
    private Integer waveId;
  
    /**
     * Field ContainerDimensionsType
     */
    private ContainerDimensionsType containerDimensionsType;
  
    /**
     * Field MinUnificationLevel
     */
    private SelectabledUnificationLevel minUnificationLevel;


    private ValidateWorkOrderDto(ValidateWorkOrderDtoBuilder builder) { 

        this.workOrderId = builder.workOrderId;
        this.waveId = builder.waveId;
        this.containerDimensionsType = builder.containerDimensionsType;
        this.minUnificationLevel = builder.minUnificationLevel;
        
    }

    /**
     * Get Field WorkOrderId
     */
    public Long getWorkOrderId() {
        return workOrderId;
    }
    
    /**
     * Get Field WaveId
     */
    public Integer getWaveId() {
        return waveId;
    }
    
    /**
     * Get Field ContainerDimensionsType
     */
    public ContainerDimensionsType getContainerDimensionsType() {
        return containerDimensionsType;
    }
    
    /**
     * Get Field MinUnificationLevel
     */
    public SelectabledUnificationLevel getMinUnificationLevel() {
        return minUnificationLevel;
    }
    

    public static ValidateWorkOrderDtoBuilder builder() {
        return new ValidateWorkOrderDtoBuilder();
    }

    public static class ValidateWorkOrderDtoBuilder {

        private Long workOrderId;
        private Integer waveId;
        private ContainerDimensionsType containerDimensionsType;
        private SelectabledUnificationLevel minUnificationLevel;
    
      
        public ValidateWorkOrderDtoBuilder workOrderId(Long workOrderId) {
            this.workOrderId = workOrderId;
            return this;
        }
      
        public ValidateWorkOrderDtoBuilder waveId(Integer waveId) {
            this.waveId = waveId;
            return this;
        }
      
        public ValidateWorkOrderDtoBuilder containerDimensionsType(ContainerDimensionsType containerDimensionsType) {
            this.containerDimensionsType = containerDimensionsType;
            return this;
        }
      
        public ValidateWorkOrderDtoBuilder minUnificationLevel(SelectabledUnificationLevel minUnificationLevel) {
            this.minUnificationLevel = minUnificationLevel;
            return this;
        }
    

        public ValidateWorkOrderDto build() {
            return new ValidateWorkOrderDto(this);
        }
    }
}